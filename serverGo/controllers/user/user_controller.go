package user_controller

import (
	"context"
	"crypto/sha256"
	"fmt"
	"log"
	"net/mail"
	"os"
	"time"

	"github.com/aeum1016/DSM2/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type UserController interface {
	GetAllUsers(ctx *gin.Context) ([]models.User, error)
	GetUsers(ctx *gin.Context) (models.User, error)
	RegisterUser(ctx *gin.Context) (string, error)
	LoginUser(ctx *gin.Context) (string, error)
}

func GetAllUsers(ctx *gin.Context) ([]models.User, error) {
	users := models.UsersCollection
	
	filter := bson.D{}
	
	cur, err := users.Find(context.TODO(), filter); if err != nil {
		return nil, fmt.Errorf("GetAllUsers: failed to get all users with error %s", err)
	}
	
	var results []models.User

	err = cur.All(context.TODO(), &results); if err != nil {
		return nil, fmt.Errorf("GetAllUsers: failed to get decode all users with error %s", err)
	}

	return results, nil
}

func GetUserByEmail(ctx *gin.Context) (models.User, error) {
	filter := bson.D{{"email", ctx.Param("email")}}
	return models.FindOneUser(filter)
}

func RegisterUser(ctx *gin.Context) (string, error) {
	var user models.User
	err := ctx.ShouldBind(&user); if err != nil {
		return "", fmt.Errorf("RegisterUser: failed to bind registering user %s", err)
	}

	_, err = mail.ParseAddress(user.Email); if err != nil {
		return "", fmt.Errorf("RegisterUser: failed to register user %s", err)
	}

	user.UserID = bson.NewObjectID()

	h := sha256.New()
	h.Write([]byte(user.Password))
	user.Password = string(h.Sum(nil))
	
	user.Friends = []bson.ObjectID{}
	user.Requests = []bson.ObjectID{}

	col := models.UsersCollection
	_, err = col.InsertOne(context.TODO(), user); if err != nil {
		return "", fmt.Errorf("RegisterUser: failed to insert user %s", err)
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": user.Email,
		"_id": user.UserID,
		"exp": time.Now().Add(12 * time.Hour).Unix(),
	})

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Println("Set your 'JWT_SECRET' environment variable.")
	}

	tokenString, err := token.SignedString([]byte(secret)); if err != nil {
		return "", fmt.Errorf("RegisterUser: failed to sign jwt %s", err)
	}

	return tokenString, nil
}

func LoginUser(ctx *gin.Context) (string, error) {
	var user models.User
	err := ctx.ShouldBind(&user); if err != nil {
		return "", fmt.Errorf("LoginUser: failed to bind login user %s", err)
	}

	filter := bson.D{{"email", user.Email}}
	foundUser, err := models.FindOneUser(filter); if err != nil {
		return "", fmt.Errorf("LoginUser: failed to find login user %s", err)
	}

	h := sha256.New()
	h.Write([]byte(user.Password))

	if string(h.Sum(nil)) != foundUser.Password {
		return "", fmt.Errorf("LoginUser: failed to login user")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": foundUser.Email,
		"_id": foundUser.UserID,
		"exp": time.Now().Add(12 * time.Hour).Unix(),
	})

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Println("Set your 'JWT_SECRET' environment variable.")
	}

	tokenString, err := token.SignedString([]byte(secret)); if err != nil {
		return "", fmt.Errorf("RegisterUser: failed to sign jwt %s", err)
	}
	
	return tokenString, nil
}