import React from 'react';
import './QueryBuilder.css';

export default function QueryBuilder() {
    return <div className="querySelector">
        <div className="allQueries">
            <div className="where">where</div>
            <div className="queryRows">
                <div>row1</div>
                <div>row2</div>
            </div>
        </div>
        <div className="btn addBtn">+ Add</div>
        <div className="btn applyBtn">Apply</div>
    </div>
}
