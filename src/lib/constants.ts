export const vehicles = [
    {
        id: "VEH001",
        make: "Toyota",
        model: "Corolla",
        licensePlate: "ABC123",
        status: "Active",
        fuelEfficiency: 28.5,
    },
    {
        id: "VEH002",
        make: "Honda",
        model: "Civic",
        licensePlate: "DEF456",
        status: "Active",
        fuelEfficiency: 30.2,
    },
    {
        id: "VEH003",
        make: "Ford",
        model: "F-150",
        licensePlate: "GHI789",
        status: "Maintenance Required",
        fuelEfficiency: 22.1,
    },
    {
        id: "VEH004",
        make: "Chevrolet",
        model: "Silverado",
        licensePlate: "JKL012",
        status: "Active",
        fuelEfficiency: 24.8,
    },
    {
        id: "VEH005",
        make: "Nissan",
        model: "Rogue",
        licensePlate: "MNO345",
        status: "Active",
        fuelEfficiency: 27.3,
    },
    {
        id: "VEH006",
        make: "Hyundai",
        model: "Sonata",
        licensePlate: "PQR678",
        status: "Maintenance Required",
        fuelEfficiency: 28.9,
    },
];

export const schedules = [
    {
        id: 'SCD001',
        lastService: new Date(new Date().getDate() - 20),
        nextService: new Date(new Date().getDate() + 10),
        type: 'Oil Change',
        vehicleId: 'VEH001',
        vehicle: {
            licensePlate: "ABC123",
        }
    },
    {
        id: 'SCD002',
        lastService: new Date(new Date().getDate() - 10),
        nextService: new Date(new Date().getDate() + 12),
        type: 'Tire Rotation',
        vehicleId: 'VEH003',
        vehicle: {
            licensePlate: "GHI789",
        }
    },
    {
        id: 'SCD003',
        lastService: new Date(new Date().getDate() - 3),
        nextService: new Date(new Date().getDate() + 7),
        type: 'Brake Service',
        vehicleId: 'VEH002',
        vehicle: {
            licensePlate: "DEF456",
        }
    },
]

export const colors = [
    {
        bgColor: 'bg-white',
        label: 'White'
    }, 
    {
        bgColor: 'bg-black',
        label: 'Black'
    }, 
    {
        bgColor: 'bg-red-500',
        label: 'Red'
    }, 
    {
        bgColor: 'bg-blue-500',
        label: 'Blue'
    }, 
    {
        bgColor: 'bg-gray-500',
        label: 'Gray'
    }, 
    {
        bgColor: 'bg-[#A52A2A]',
        label: 'Brown'
    }, 
    {
        bgColor: 'bg-yellow-500',
        label: 'Yellow'
    }, 
    {
        bgColor: 'bg-orange-500',
        label: 'Orange'
    }, 
    {
        bgColor: 'bg-[#C0C0C0]',
        label: 'Silver'
    },
    {
        bgColor: '',
        label: 'Other'
    },
]