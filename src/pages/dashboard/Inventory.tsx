import React from 'react';
import BriefCard from '../../components/dashboard/BriefCard';
import InventoryTable, { InventoryItem } from '@/components/inventory/InventoryTable';

const Inventory: React.FC = () => {
    const data = [
        { title: "Total Categories", content: 3 },
        { title: "Total Products", content: 50 },
        { title: "Production rate (per day)", content: 25 },
    ];

    const inventoryData: InventoryItem[] = [
        {
            id: '1',
            price: 30,
            status: "In Stock",
            quantity: 50,
            name: 'Bag',
            category: 'Clothing Items'
        },
        {
            id: '2',
            price: 10,
            status: "Out of Stock",
            quantity: 0,
            name: 'Shirt',
            category: 'Clothing Items'
        },
        {
            id: '3',
            price: 13,
            status: "In Stock",
            quantity: 50,
            name: 'Plate',
            category: 'Homeware'
        },
        {
            id: '4',
            price: 3,
            status: "In Stock",
            quantity: 5,
            name: 'Pen',
            category: 'Stationery'
        },
        {
            id: '5',
            price: 30,
            status: "In Stock",
            quantity: 50,
            name: 'Shoe',
            category: 'Clothing Items'
        },
        {
            id: '6',
            price: 30,
            status: "In Stock",
            quantity: 50,
            name: 'Socks',
            category: 'Clothing Items'
        },
    ]

    return (
        <div>
            <p className='mb-5'>Monitor Inventory</p>
            <div className="flex flex-wrap gap-y-3 -mx-1 mb-3">
                {data.map((item, index) => (
                    <div key={index} className="w-full px-3 lg:w-1/3">
                        <BriefCard title={item.title} content={item.content} />
                    </div>
                ))}
            </div>

            <InventoryTable data={inventoryData} />
        </div>
    );
};

export default Inventory;