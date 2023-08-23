import React, { useState, useEffect } from 'react';

const leafData = [
    {
        type: 'Bacterial Spot',
        description: 'Small dark lesions on leaves, fruit, and stems',
        causes: [
            'High humidity and moisture promote bacterial growth and spread.',
            'Warm temperatures (24°C to 29°C) encourage bacterial growth and symptom development.',
            'Overcrowded plant arrangement increases humidity within the plant canopy, promoting bacterial growth.'
        ]
    },
    {
        type: 'Early Blight',
        description: 'Light brown circular lesions with a darker center on plant leaves',
        causes: [
            'Primarily occurs in warm and humid environments (high humidity and temperature promote the disease).',
            'Excessive watering increases leaf wetness, promoting fungal growth.',
            'Acidic or alkaline soil conditions encourage pathogen development.'
        ]
    },
    {
        type: 'Late Blight',
        description: 'A severe pathogen affecting potato and tomato plants',
        causes: [
            'Spreads more rapidly in high humidity and cool climates.',
            'Infected plant debris promotes the spread of the disease.'
        ]
    },
    {
        type: 'Leaf Mold',
        description: 'Leaf spot disease in tomato plants',
        causes: [
            'Easily infects in high humidity environments.',
            'Poor airflow among closely located plants leads to rapid disease spread.',
            'While most tomato varieties have resistance to leaf mold, susceptible varieties can still get infected.'
        ]
    },
    {
        type: 'Septoria Leaf Spot',
        description: 'Leaf browning caused by Septoria fungi',
        causes: [
            'Moisture facilitates the spread and growth of this fungus.',
            'Contact of lower leaves with water droplets spreads the infection to other leaves.'
        ]
    },
    {
        type: 'Spider Mites',
        description: 'Tiny arachnids that damage plant leaves',
        causes: [
            'Thrives in warm and dry conditions.',
            'Easily spreads in stressed plants (water or nutrient deficiency).'
        ]
    },
    {
        type: 'Target Spot',
        description: 'Circular black or dark brown spots on leaves',
        causes: [
            'Higher humidity environments promote spread.',
            'Poor airflow due to closely spaced plants increases the likelihood of disease.'
        ]
    },
    {
        type: 'Mosaic Virus',
        description: 'Causes pattern and color changes on leaves',
        causes: ['Mainly transmitted through insects.']
    },
    {
        type: 'Yellow Leaf Curl Virus',
        description: 'Causes yellowing, curling, and pattern changes on leaves',
        causes: ['Spread by the Bemisia tabaci whitefly vector.']
    }

];

const PlantInfo = () => {
    const renderLeafIllustrations = () => {
        return leafData.map((leafData, index) => (
            <tr key={index}>
                <td>{leafData.type}</td>
                <td>{leafData.description}</td>
                <td>{leafData.causes}</td>
            </tr>
        ));
    };
    return (
        <div>
            <h2>Types of leaf ill</h2>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Causes</th>
                    </tr>
                </thead>
                <tbody>{renderLeafIllustrations()}</tbody>
            </table>
        </div>
    );
}

export default PlantInfo;
