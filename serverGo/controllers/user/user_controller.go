package user_controller

import (
	"context"
	"crypto/sha256"
	"fmt"
	"net/mail"

	"github.com/aeum1016/DSM2/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type UserController interface {
	GetAllUsers(ctx *gin.Context) ([]models.User, error)
	GetUsers(ctx *gin.Context) (models.User, error)
	RegisterUser(ctx *gin.Context) (models.User, error)
	LoginUser(ctx *gin.Context) (models.User, error)
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

func RegisterUser(ctx *gin.Context) error {
	var user models.User
	err := ctx.ShouldBind(&user); if err != nil {
		return fmt.Errorf("RegisterUser: failed to bind registering user %s", err)
	}

	_, err = mail.ParseAddress(user.Email); if err != nil {
		return fmt.Errorf("RegisterUser: failed to register user %s", err)
	}

	user.UserID = bson.NewObjectID()

	h := sha256.New()
	h.Write([]byte(user.Password))
	user.Password = string(h.Sum(nil))
	
	user.Friends = []bson.ObjectID{}
	user.Requests = []bson.ObjectID{}

	col := models.UsersCollection
	_, err = col.InsertOne(context.TODO(), user); if err != nil {
		return fmt.Errorf("RegisterUser: failed to insert user %s", err)
	}

	return nil 
}

func LoginUser(ctx *gin.Context) (models.User, error) {
	var user models.User
	err := ctx.ShouldBind(&user); if err != nil {
		return models.User{}, fmt.Errorf("LoginUser: failed to bind login user %s", err)
	}

	filter := bson.D{{"username", user.Username}}
	foundUser, err := models.FindOneUser(filter); if err != nil {
		return models.User{}, fmt.Errorf("LoginUser: failed to find login user %s", err)
	}

	h := sha256.New()
	h.Write([]byte(user.Password))

	if string(h.Sum(nil)) != foundUser.Password {
		return models.User{}, fmt.Errorf("LoginUser: failed to login user")
	}
	
	return foundUser, nil
}