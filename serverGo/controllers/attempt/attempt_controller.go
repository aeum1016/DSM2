package attempt_controller

import (
	"fmt"
	"time"

	"github.com/aeum1016/DSM2/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type AttemptController interface {
	GetAllAttempts(ctx *gin.Context) ([]models.Attempt, error)
	CreateAttempt(ctx *gin.Context) error
	GetUserAttempts(ctx *gin.Context) ([]models.Attempt, error)
}

func GetAllAttempts(ctx *gin.Context) ([]models.Attempt, error) {
	
	filter := bson.D{}
	results, err := models.FindAttempts(filter); if err != nil {
		return nil, fmt.Errorf("GetAllAttempts:%s", err)
	}	
	return results, nil
}

func GetUserAttempts(ctx *gin.Context) ([]models.Attempt, error) {
	id, err := bson.ObjectIDFromHex(ctx.Param("uid")); if err != nil {
		return nil, fmt.Errorf("GetUserAttempts:failed to parse uid %s", err)
	}
	filter := bson.D{{"userId", id}}
	results, err := models.FindAttempts(filter); if err != nil {
		return nil, fmt.Errorf("GetUserAttempts:%s", err)
	}
	return results, nil
}

func CreateAttempt(ctx *gin.Context) error {
	var attempt models.Attempt 
	err := ctx.ShouldBind(&attempt); if err != nil {
		return fmt.Errorf("CreateAttempt: could not bind attempt with error %s", err)
	}

	attempt.AttemptID = bson.NewObjectID()
	attempt.CreatedAt = time.Now()

	err = models.CreateAttempt(attempt); if err != nil {
		return fmt.Errorf("CreateAttempt: could not create attempt with error %s", err)
	}

	return nil
}
