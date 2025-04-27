package attempt_controller

import (
	"fmt"
	"log"
	"time"

	"github.com/aeum1016/DSM2/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type AttemptController interface {
	GetAllAttempts(ctx *gin.Context) ([]models.Attempt, error)
	GetLeaderboardAttemptsByTime(ctx *gin.Context) ([]models.Attempt, error)
	GetLeaderboardAttemptsByCompleted(ctx *gin.Context) ([]models.Attempt, error)
	CreateAttempt(ctx *gin.Context) error
	GetUserAttempts(ctx *gin.Context) ([]models.Attempt, error)
}

func GetAllAttempts(ctx *gin.Context) ([]models.Attempt, error) {
	filter := bson.D{}
	results, err := models.FindAttempts(filter, &options.FindOptionsBuilder{})
	if err != nil {
		return nil, fmt.Errorf("GetAllAttempts:%s", err)
	}
	return results, nil
}

func GetLeaderboardAttemptsByTime(ctx *gin.Context) ([]models.LeaderboardAttempt, error) {
	log.Default().Print(ctx.Param("setting"))
	filter := bson.D{{"setting", ctx.Param("setting")}}
	results, err := models.GetLeaderboardAttemptsByTime(filter)
	if err != nil {
		return nil, fmt.Errorf("GetAttemptsByTime:%s", err)
	} else if len(results) == 0 {
		return nil, fmt.Errorf("GetAttemptsByTime: No rows")
	}
	return results, nil
}

func GetLeaderboardAttemptsByCompleted(ctx *gin.Context) ([]models.LeaderboardAttempt, error) {
	filter := bson.D{{"setting", ctx.Param("setting")}}
	results, err := models.GetLeaderboardAttemptsByTime(filter)
	if err != nil {
		return nil, fmt.Errorf("GetAttemptsByCompleted:%s", err)
	} else if len(results) == 0 {
		return nil, fmt.Errorf("GetAttemptsByCompleted: No rows")
	}
	return results, nil
}

func GetUserAttempts(ctx *gin.Context) ([]models.Attempt, error) {
	id, err := bson.ObjectIDFromHex(ctx.Param("uid"))
	if err != nil {
		return nil, fmt.Errorf("GetUserAttempts:failed to parse uid %s", err)
	}
	filter := bson.D{{"userId", id}}
	results, err := models.FindAttempts(filter, &options.FindOptionsBuilder{})
	if err != nil {
		return nil, fmt.Errorf("GetUserAttempts:%s", err)
	}
	return results, nil
}

func CreateAttempt(ctx *gin.Context) error {
	var attempt models.Attempt
	err := ctx.ShouldBind(&attempt)
	if err != nil {
		return fmt.Errorf("CreateAttempt: could not bind attempt with error %s", err)
	}

	attempt.AttemptID = bson.NewObjectID()
	attempt.CreatedAt = time.Now()

	err = models.CreateAttempt(attempt)
	if err != nil {
		return fmt.Errorf("CreateAttempt: could not create attempt with error %s", err)
	}

	return nil
}
