all:
	GATSBY_LNG=ru yarn build
	cp -r ./public/* ./root/ru
	
	GATSBY_LNG=en yarn build
	cp -r ./public/* ./root/en
