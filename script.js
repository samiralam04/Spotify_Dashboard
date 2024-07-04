// Function to fetch data from Spotify API based on genre
async function fetchDataByGenre(genre) {
    try {
        let url = 'https://api.spotify.com/v1/playlists/{playlist_id}'; // Replace with your actual endpoint
        if (genre) {
            url += `?genre=${genre}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to process fetched data and prepare for charts
async function processData(genre) {
    const data = await fetchDataByGenre(genre);
    // Process data here, format it for Chart.js
    // Example data structure for demonstration:
    const processedData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        barChartData: [12, 19, 3, 5, 2, 3, 9],
        lineChartData: [30, 50, 20, 40, 10, 30, 50],
        pieChartData: [25, 20, 30, 25]
    };
    return processedData;
}

// Function to update charts based on genre selection
async function updateCharts(genre) {
    const data = await processData(genre);

    // Update Bar chart
    const barChart = new Chart(document.getElementById('barChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Number of Songs Released',
                data: data.barChartData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Update Line chart
    const lineChart = new Chart(document.getElementById('lineChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Number of Streams',
                data: data.lineChartData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Update Pie chart
    const pieChart = new Chart(document.getElementById('pieChart').getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Pop', 'Rock', 'Hip Hop', 'Others'],
            datasets: [{
                label: 'Genre Distribution',
                data: data.pieChartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                        }
                    }
                }
            }
        }
    });

    // Return chart instances 
    return { barChart, lineChart, pieChart };
}

// Event listener for Apply Filter button
document.getElementById('applyFilter').addEventListener('click', async function() {
    const genre = document.getElementById('genreSelect').value;
    await updateCharts(genre);
});


window.onload = async function() {
    await updateCharts(); 
};
