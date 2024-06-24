document.getElementById('workout-form').addEventListener('submit', async function (event) {

    event.preventDefault();

    const type = document.getElementById('type').value;

    const duration = document.getElementById('duration').value;

    const date = document.getElementById('date').value;



    try {

        const response = await fetch('http://localhost:3000/api/workouts', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

            },

            body: JSON.stringify({ type, duration, date }),

        });



        if (!response.ok) {

            throw new Error('Failed to log workout');

        }



        const workout = await response.json();

        displayWorkout(workout);

        updateChart();

    } catch (error) {

        alert(error.message);

    }

});



async function fetchWorkouts() {

    const response = await fetch('http://localhost:3000/api/workouts');

    const workouts = await response.json();

    workouts.forEach(displayWorkout);

    updateChart();

}



function displayWorkout(workout) {

    const workoutHistory = document.getElementById('workout-history');

    const workoutElement = document.createElement('div');

    workoutElement.textContent = `${workout.date.split('T')[0]}: ${workout.type} - ${workout.duration} mins`;

    workoutHistory.appendChild(workoutElement);

}



async function updateChart() {

    const response = await fetch('http://localhost:3000/api/workouts');

    const workouts = await response.json();

    const ctx = document.getElementById('progress-chart').getContext('2d');

    const dates = workouts.map(workout => workout.date.split('T')[0]);

    const durations = workouts.map(workout => workout.duration);



    new Chart(ctx, {

        type: 'line',

        data: {

            labels: dates,

            datasets: [{

                label: 'Workout Duration',

                data: durations,

                borderColor: 'rgba(75, 192, 192, 1)',

                borderWidth: 2,

                fill: false,

            }]

        },

        options: {

            scales: {

                x: {

                    type: 'time',

                    time: {

                        unit: 'day',

                    },

                },

                y: {

                    beginAtZero: true,

                }

            }

        }

    });

}



fetchWorkouts();
