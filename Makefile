eslint:
	npm run lint && npm run format


deploy-prod:
	cp .env.prod.example .env
	npm run build
	echo "Uploading to s3"
	aws s3 sync ./build s3://sotatek-chatbot --exclude "index.html"
	aws s3 sync ./build s3://sotatek-chatbot --exclude "index.html" --include "*.html"
	  rm -f ./build/index.html
	echo "Deploy client finished!"
	aws cloudfront create-invalidation \
        --distribution-id E2AWSG20KCDEIZ \
        --paths "/" "/js/app.js" "/css/app.css" "/index.css"
