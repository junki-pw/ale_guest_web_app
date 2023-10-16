'use client'

import React from 'react'
import { MenuTile } from './components/menu_tile'
import CategoryTile from './components/category_tile'
import { v4 as uuidv4 } from 'uuid';

export default function MenusPage() {
    const arr = ["リンゴ", "パイナップル", "ペン"];

    const list = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

    return (
        <main>
            {list.map((fruit, i) =>
                <div>
                    <CategoryTile
                        key={uuidv4()}
                    />
                    {arr.map((e) => <MenuTile
                        key={uuidv4()}
                    />)}
                </div>
            )}
        </main>
    )
}
