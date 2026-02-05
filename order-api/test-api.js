async function testFullFlow() {
    const baseUrl = 'http://localhost:3000/api/orders';

    console.log('--- 1. Creando orden (JSON Corregido) ---');
    
    // JSON SEGÚN PUNTO 4.1
    const nuevaOrden = {
        title: "Orden Corregida V2",
        fields: [
            { 
                id: "f1", 
                type: "text", 
                order: 1,
                props: {
                    label: "Nombre del Cliente",
                    required: true
                }
            },
            {
                id: "f2", 
                type: "number", 
                order: 2,
                props: {
                    label: "Edad",
                    required: false
                }
            }
        ]
    };

    try {
        const createRes = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaOrden)
        });

        const data = await createRes.json();
        
        if (createRes.ok) {
            console.log('✅ Orden Creada. ID:', data.id);
        } else {
            console.log('❌ Error creando:', data);
        }
    } catch (e) { console.error(e); }
}

testFullFlow();