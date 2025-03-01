package user_controller

import (
	"context"
	"fmt"
	"log"

	"github.com/aeum1016/DSM2/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type TaskController interface {
	GetAllUsers(ctx *gin.Context) error
	GetUsers(ctx *gin.Context) error
}

func GetAllUsers(ctx *gin.Context) ([]models.User, error) {
	users := models.UsersCollection
	
	filter := bson.D{}
	
	cur, err := users.Find(context.TODO(), filter); if err != nil {
		return nil, fmt.Errorf("failed to get all users with error %s", err)
	}
	
	var results []models.User

	err = cur.All(context.TODO(), &results); if err != nil {
		return nil, fmt.Errorf("failed to get decode all users with error %s", err)
	}

	return results, nil
}

func GetUserByEmail(ctx *gin.Context) (models.User, error) {
	filter := bson.D{{"email", ctx.Param("email")}}
	return models.FindOneUser(filter)
}

func RegisterUser(ctx *gin.Context) (models.UserWithoutID, error) {
	var user models.UserWithoutID
	err := ctx.ShouldBind(&user); if err != nil {
		return models.UserWithoutID{}, fmt.Errorf("failed to bind registering user %s", err)
	}

	user.Friends = []bson.ObjectID{}
	user.Requests = []bson.ObjectID{}

	col := models.UsersCollection
	_, err = col.InsertOne(context.TODO(), user); if err != nil {
		log.Printf("failed to insert user %s", err)
		return models.UserWithoutID{}, fmt.Errorf("failed to insert user %s", err)
	}

	return user, nil 
}