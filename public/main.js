function getVoteAndSendToNode() { 
    const form = document.getElementById('vote-form');

    form.addEventListener('submit', (e) => {
        const choice = document.querySelector('input[name=os]:checked').value;

        const data = {
            os: choice
        }

        fetch('../routes/poll', {
            method: 'post',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

        e.preventDefault();
    });
}

getVoteAndSendToNode();


fetch('../routes/poll')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        let totalVotes = votes.length;

        const voteCounts = votes.reduce((pre, cur) => ((pre[cur.os] = (pre[cur.os] || 0) + parseInt(cur.points)), pre), {});

        let dataPoints = [
            {label: 'Windows', y: voteCounts.Windows},
            {label: 'MacOS', y: voteCounts.MacOS},
            {label: 'Linux', y: voteCounts.Linux},
            {label: 'Others', y: voteCounts.Others}        
        ];
        
        const chartContainer = document.querySelector('#chartContainer');
        
        if(chartContainer) {
            const chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "theme1",
                title: {
                    text: 'OS Results'
                },
                data: [
                    {
                       type: "column",
                       dataPoints: dataPoints
                    }
                ]
            });
            chart.render();
        
            var pusher = new Pusher('52477b0c09ca20a90228', {
                cluster: 'ap2',
                encrypted: true
            });
        
            var channel = pusher.subscribe('os-poll');
        
            channel.bind('os-vote', (data) => {
                dataPoints = dataPoints.map(x => {
                    if (x.label === data.os) {
                        x.y += data.points;
                        totalVotes++
                        return x;
                    } else {
                        return x;
                    }
                });
        
                chart.render();
            });
        }
    })
    .catch(e => console.log(e));
