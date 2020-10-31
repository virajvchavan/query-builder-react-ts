import React from 'react';
import { ConfigType } from '../../queryConfig';
import './QueryBuilder.css';

interface Props {
    queryConfig: ConfigType
}

export default function QueryBuilder({queryConfig}: Props) {
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
