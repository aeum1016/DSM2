package user

import (
	"net/http"

	user_controller "github.com/aeum1016/DSM2/controllers/user"
	"github.com/gin-gonic/gin"
)

func InitUserRoutes(r *gin.Engine) {
	ur := r.Group("/user")
	ur.GET("/token", getUserAuth())
}

func getUserAuth() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		err := user_controller.LoginUser(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, nil)
	}
}
