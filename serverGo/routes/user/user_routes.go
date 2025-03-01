package user

import (
	"log"
	"net/http"

	user_controller "github.com/aeum1016/DSM2/controllers/user"
	"github.com/gin-gonic/gin"
)

func InitUserRoutes(r *gin.Engine) {
	ur := r.Group("/user")
	ur.GET("/get", GetAllUsers())
	ur.GET("/get/:email", GetUserByEmail())
	ur.POST("/register", RegisterUser())
	ur.POST("/login", LoginUser())
}

func GetAllUsers() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		result, err := user_controller.GetAllUsers(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, result)
	}
}

func GetUserByEmail() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		result, err := user_controller.GetUserByEmail(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, result)
	}
}

func RegisterUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		err := user_controller.RegisterUser(ctx)
		if err != nil {
      log.Println(err)
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, nil)
	}
}

func LoginUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		result, err := user_controller.LoginUser(ctx)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, result)
	}
}