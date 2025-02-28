package user_controller

import (
	"github.com/aeum1016/DSM2/models"
	"github.com/gin-gonic/gin"
)

type TaskController interface {
	LoginUser(ctx *gin.Context) error
}

func LoginUser(ctx *gin.Context) error {
	_ = models.DB

	return nil
}
