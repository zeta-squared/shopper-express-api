data "external_schema" "sequelize" {
	program = [
		"npx",
		"@ariga/ts-atlas-provider-sequelize",
		"load",
		"--path", "./db/models",
		"--dialect", "sqlite",
	]
}

env "sequelize" {
	src = data.external_schema.sequelize.url
	dev = "sqlite://dev?mode=memory"
	url = "sqlite://db/shopper.db"
	migration {
		dir = "file://db/migrations"
	}
	format {
		migrate {
			diff = "{{ sql . \" \" }}"
		}
	}
}
