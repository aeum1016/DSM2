package routes

import (
	"github.com/aeum1016/DSM2/routes/attempt"
	"github.com/aeum1016/DSM2/routes/user"
	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.Engine) {
	user.InitUserRoutes(r)
	attempt.InitAttemptRoutes(r)
}