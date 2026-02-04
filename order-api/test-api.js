async function testValidation() {
    const url = 'http://localhost:3000/api/orders';

    console.log('--- INTENTO DE SABOTAJE (Debe fallar) ---');
    
    // Esta orden tiene un tipo "magia" que NO existe
    const ordenInvalida = {
        title: "Orden Hackeada",
        fields: [
            { id: "f1", type: "magia", order: 1 } 
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ordenInvalida)
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.log('✅ EXCELENTE: El servidor rechazó la orden inválida.');
            console.log('   Razón:', data.message);
        } else {
            console.log('❌ PELIGRO: El servidor aceptó datos incorrectos.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testValidation();