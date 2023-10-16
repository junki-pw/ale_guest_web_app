'use client'

import React from 'react'
import { MenuTile } from './components/menu_tile'
import CategoryTile from './components/category_tile'

export default function MenusPage() {
    const arr = ["リンゴ", "パイナップル", "ペン"];

    const list = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

    return (
        <main>
            {list.map((fruit, i) =>
                <div>
                    <CategoryTile />
                    {arr.map((e) => <MenuTile />)}
                </div>
            )}
        </main>
    )
}
