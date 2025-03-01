package user_controller

import (
	"context"
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
		log.Println("Failed to get all users")
	}
	
	var results []models.User

	err = cur.All(context.TODO(), &results); if err != nil {
		log.Println("Failed to decode all users")
	}

	return results, nil
}

func GetUserByEmail(ctx *gin.Context) (models.User, error) {
	filter := bson.D{{"email", ctx.Param("email")}}
	return models.FindOneUser(filter)
}