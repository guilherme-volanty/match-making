# Rotas da API

# Endereço base: 
https://d1qz6xp2lbl1xi.cloudfront.net/

Matches:

/matches/match - Posta um novo Match no banco de dados
/matches/match/all - Retorna todos os matches já feitos
/matches/match/:id - Retorna um match específico de acordo com o Id
/matches/match/delete/:id - Deleta um match específicado por Id
/matches/match/update/:id - Atualiza um match específicado por Id


Classificador e Base Principal:

/classifier/classfier-data - Retorna os dados dos Matches do Classificador
/classifier/base-cars - Retorna todos os dados da base da Webmotors
/classifier//base-cars-list/brands/ - Retorna as marcas dos carros na Webmotors
/classifier//base-cars-list/brands/:brandsId/models/ - Retorna os modelos dos carros na Webmotors
/classifier//base-cars-list/brands/:brandsId/models/:models/years/ - Retorna os anos dos carros na Webmotors
/classifier//base-cars-list/brands/:brandsId/models/:models/years/:year/version - Retorna as versões do carro na Webmotors


Bases de comparação:
/databases/file/upload - Upload das Bases Localiza e Movida
