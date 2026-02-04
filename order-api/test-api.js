async function testFullFlow() {
    const baseUrl = 'http://localhost:3000/api/orders';

    console.log('--- 1. Creando una orden nueva ---');
    const nuevaOrden = {
        title: "Orden para buscar",
        fields: [{ id: "f1", type: "text", label: "Busca esto", order: 1 }]
    };

    const createRes = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaOrden)
    });
    const ordenCreada = await createRes.json();
    console.log('✅ Orden Creada con ID:', ordenCreada.id);

    console.log('\n--- 2. Buscando esa orden específica por ID ---');
    const getRes = await fetch(`${baseUrl}/${ordenCreada.id}`);
    
    if (getRes.ok) {
        const ordenEncontrada = await getRes.json();
        console.log('✅ EXITO: Se recuperó la orden correcta.');
        console.log('   Título:', ordenEncontrada.title);
    } else {
        console.log('❌ ERROR: No se encontró la orden.');
    }

    console.log('\n--- 3. Probando buscar un ID falso ---');
    const fakeRes = await fetch(`${baseUrl}/id-falso-123`);
    if (fakeRes.status === 404) {
        console.log('✅ EXITO: El sistema respondió 404 correctamente para ID inexistente.');
    } else {
        console.log('❌ ERROR: Debería haber fallado con 404.');
    }
}

testFullFlow();