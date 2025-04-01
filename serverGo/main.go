package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aeum1016/DSM2/models"
	"github.com/aeum1016/DSM2/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file, ", err);
	}

	models.DBConnection(context.Background())
	defer models.Close()

	r := gin.Default()

	config := cors.DefaultConfig()

	config.AllowOrigins = []string{"http://localhost:3000", os.Getenv("FRONTEND_URL")}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	routes.InitRoutes(r)

	env := os.Getenv("ENV")
	if(env == "DEV") {
		r.Run(":8080")
	} else if (env == "PROD") {
		r.RunTLS(":8080", os.Getenv("SSL_CERT_CHAIN"), os.Getenv("SSL_CERT_PRIV"))
	} else {
		fmt.Println("No env defined")
	}
}