/**
 * Encontra a menor rota para o problema do caixeiro viajante utilizando o algoritmo de colônias de formiga
 * @param {{x: Number, y: Number}[]} coords - Um array com as coordenadas de cada ponto
 * @param {Number} numAnts - A quantidade de formigas a serem simuladas
 * @param {Number} alpha - Força de influência do feromônio
 * @param {Number} beta - Força de influência da distância
 * @param {Number} evaporationRate - Velocidade de evaporação do feromônio.
 * @param {Number} numIterations - Número de iterações.
 * @returns {Number[]} - Os indexes em ordem.
 */
function antColonyTSP(
    coords,
    numAnts = 10,
    alpha = 1,
    beta = 2,
    evaporationRate = 0.5,
    numIterations = 100,
) {
    // Número de "cidades" para visitar
    const numCities = coords.length;

    // Criação de uma formiga
    function createAnt() {
        return {
            path: [], // Caminho da formiga
            visitedCities: new Array(numCities).fill(false),
            visitCity(city) {
                this.path.push(city);
                this.visitedCities[city] = true;
            }
        };
    }

    // Simula uma formiga visitando todas as cidades
    function antVisitCities(ant) {
        while (ant.path.length < numCities) {
            const nextCity = chooseNextCity(ant);
            ant.visitCity(nextCity);
        }
    }

    // Função que escolhe a próxima cidade da formiga
    function chooseNextCity(ant) {
        const currentCity = ant.path.length === 0 ? 0 : ant.path[ant.path.length - 1];
        const unvisitedCities = getUnvisitedCities(ant);

        // Retorna para primeira cidade visitada
        if (unvisitedCities.length === 0) {
            return 0;
        }

        // Calcula a probabilidade de visitar cada cidade
        const probabilities = unvisitedCities.map(city =>
        ({
            city,
            probability: calculateProbability(currentCity, city)
        })
        );

        // Seleciona a próxima cidade, baseado na probabilidade
        const selectedCity = selectCityByProbability(probabilities);
        return selectedCity;
    }

    // Calcula a probabilidade de mover de uma cidade para outra, com base na distância e feromônios (alfa e beta determinam quão forte os valores influenciam a decisão)
    function calculateProbability(currentCity, nextCity) {
        const pheromone = pheromoneMatrix[currentCity][nextCity];
        const distance = distanceMatrix[currentCity][nextCity];

        return Math.pow(pheromone, alpha) * Math.pow(1 / distance, beta);
    }

    // Seleciona próxima cidade
    function selectCityByProbability(probabilities) {
        const totalProbability = probabilities.reduce((sum, prob) => sum + prob.probability, 0);
        const randomValue = Math.random() * totalProbability;

        let cumulativeProbability = 0;
        for (const prob of probabilities) {
            cumulativeProbability += prob.probability;
            if (cumulativeProbability >= randomValue) {
                return prob.city;
            }
        }

        return probabilities[0].city;
    }

    // Retorna cidades ainda não visitadas por uma formiga
    function getUnvisitedCities(ant) {
        return ant.visitedCities.map((visited, index) => visited ? -1 : index)
            .filter(city => city !== -1);
    }

    // Evaporação dos feromônios
    function evaporatePheromones() {
        pheromoneMatrix = pheromoneMatrix.map(row =>
            row.map(value => (1 - evaporationRate) * value)
        );
    }

    // Atualização dos valores dos feromônios
    function updatePheromones(ant) {
        const pheromoneDeposit = 1 / ant.path.length;

        for (let i = 0; i < ant.path.length - 1; i++) {
            const fromCity = ant.path[i];
            const toCity = ant.path[i + 1];
            pheromoneMatrix[fromCity][toCity] += pheromoneDeposit;
            pheromoneMatrix[toCity][fromCity] += pheromoneDeposit;
        }
    }

    // Calcula distâncias entre cada cidade
    const distanceMatrix = new Array(numCities).fill(0).map(() => new Array(numCities).fill(0));
    for (let i = 0; i < numCities; i++) {
        for (let j = 0; j < numCities; j++) {
            const dx = coords[i].x - coords[j].x;
            const dy = coords[i].y - coords[j].y;
            distanceMatrix[i][j] = Math.sqrt(dx * dx + dy * dy);
        }
    }

    // Matriz que guardará os feromônios entre cidades
    let pheromoneMatrix = new Array(numCities).fill(0).map(() => new Array(numCities).fill(1));

    // Criação das formigas
    const ants = new Array(numAnts).fill(null).map(createAnt);

    for (let iteration = 0; iteration < numIterations; iteration++) {
        ants.forEach(ant => {
            ant.path = [];
            ant.visitedCities.fill(false);
            antVisitCities(ant);
            updatePheromones(ant);
        });

        evaporatePheromones();
    }

    // Encontra o melhor caminho entre as formigas
    const bestAnt = ants.reduce((best, ant) =>
        ant.path.length < best.path.length ? ant : best
    );

    // Retorna o caminho da melhor formiga
    return bestAnt.path;
}

module.exports = {
    antColonyTSP
};