IMAGE_NAME := aeum1003/dsm2-backend

# Get the latest tag
LAST_TAG := $(shell docker images $(IMAGE_NAME) --format "{{.Tag}}" | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$$' | sort -V | tail -n1)

# Extract major.minor and patch
MAJOR_MINOR := $(shell echo $(LAST_TAG) | cut -d. -f1,2)
PATCH := $(shell echo $(LAST_TAG) | cut -d. -f3)

# If no existing tag, start fresh
ifeq ($(LAST_TAG),)
	NEXT_TAG := 1.0.0
else
	NEXT_PATCH := $(shell expr $(PATCH) + 1)
	NEXT_TAG := $(MAJOR_MINOR).$(NEXT_PATCH)
endif

build-docker:
	@echo "Last tag: $(LAST_TAG)"
	@echo "Building new image with tag: $(NEXT_TAG)"
	docker build --platform linux/amd64 -t $(IMAGE_NAME):$(NEXT_TAG) -t $(IMAGE_NAME):latest .

push-docker:
	@echo "Pushing image $(IMAGE_NAME):$(LAST_TAG)"
	docker push $(IMAGE_NAME):$(LAST_TAG)
	@echo "Pushing image $(IMAGE_NAME):latest"
	docker push $(IMAGE_NAME):latest
