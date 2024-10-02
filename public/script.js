document.getElementById('evento-form').addEventListener('submit', async function (event) {
    event.preventDefault(); 


    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const local = document.getElementById('local').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;
    const horario = document.getElementById('horario').value;
    const quantidade = document.getElementById('quantidade').value;


    const evento = {
        nome: nome,
        descricao: descricao,
        data: data,
        horario: horario,
        local: local,
        quantidade: quantidade,
        preco: parseFloat(preco)
    };

    try {
        console.log(evento)

        const response = await fetch('api/eventos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(evento)
        });


        const data = await response.json();
        const mensagemDiv = document.getElementById('mensagem');
        if (response.ok) {
            mensagemDiv.innerHTML = `<p>${data.message}</p>`;
            mensagemDiv.style.color = 'green';
  
            document.getElementById('evento-form').reset();
        } else {
            mensagemDiv.innerHTML = `<p>${data.error}: ${data.details}</p>`;
            mensagemDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro ao cadastrar evento:', error);
        document.getElementById('mensagem').innerHTML = `<p>Erro ao cadastrar evento: ${error.message}</p>`;
    }
});
