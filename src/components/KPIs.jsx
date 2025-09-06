import React from "react";

function KPIs(){
    return(
        <div className="kpis-container">
            <div className="kpi-box">
                <h4>Current Balance</h4>
                <p>$10,000.00</p>
            </div>
            <div className="kpi-box">
                <h4>Portfolio Value</h4>
                <p>$0.00</p>
            </div>
            <div className="kpi-box">
                <h4>Net Worth</h4>
                <p>$10,000.00</p>
            </div>
            <div className="kpi-box profit">
                <h4>P / L</h4>
                <p>$0.00</p>
            </div>
        </div>
    );
}

export default KPIs;