package main

import (
	"context"
	"fmt"

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

	config.AllowOrigins = []string{"http://localhost", "https://dsm2-frontend-896452775800.us-central1.run.app"}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	routes.InitRoutes(r)
	r.RunTLS(":8080", "ssl/backend.crt", "ssl/backend.key")
}