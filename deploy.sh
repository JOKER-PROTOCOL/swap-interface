#!/bin/bash

echo "SOURCE_COMMIT: $SOURCE_COMMIT"

if [[ -z "$SOURCE_COMMIT" ]]; then
	export SOURCE_COMMIT="${SOURCE_COMMIT:-$(git rev-parse HEAD)}"
	echo "Updating SOURCE_COMMIT from git rev-parse HEAD"
	echo "SOURCE_COMMIT: $SOURCE_COMMIT"
fi

sudo docker build -t async:$SOURCE_COMMIT .

sudo docker run -d -p 3000:3000 async:$SOURCE_COMMIT