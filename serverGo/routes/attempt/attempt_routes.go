package attempt

import (
	"net/http"

	attempt_controller "github.com/aeum1016/DSM2/controllers/attempt"
	"github.com/gin-gonic/gin"
)

func InitAttemptRoutes(r *gin.Engine) {
	ur := r.Group("/attempt")
	ur.GET("/get", GetAllAttempts())
	ur.GET("/get/time/:setting", GetLeaderboardAttemptsByTime())
	ur.GET("/get/completed/:setting", GetLeaderboardAttemptsByCompleted())
	ur.GET("/get/:uid", GetUserAttempts())
	ur.POST("/create", CreateAttempt())
}

func GetAllAttempts() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		result, err := attempt_controller.GetAllAttempts(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, result)
	}
}

func GetLeaderboardAttemptsByTime() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		result, err := attempt_controller.GetLeaderboardAttemptsByTime(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, result)
	}
}

func GetLeaderboardAttemptsByCompleted() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		result, err := attempt_controller.GetLeaderboardAttemptsByCompleted(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, result)
	}
}

func GetUserAttempts() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		result, err := attempt_controller.GetUserAttempts(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, result)
	}
}

func CreateAttempt() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		err := attempt_controller.CreateAttempt(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, nil)
	}
}
