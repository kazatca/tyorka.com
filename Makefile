all:
	GATSBY_TELEMETRY_DISABLED=1 GATSBY_LNG=ru yarn build
	mkdir -p ./root/ru
	cp -r ./public/* ./root/ru
	GATSBY_TELEMETRY_DISABLED=1 GATSBY_LNG=en yarn build
	mkdir -p ./root/en
	cp -r ./public/* ./root/en
