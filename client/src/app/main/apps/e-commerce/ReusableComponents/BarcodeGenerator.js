import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = (props) => {

    const barcodeRef = useRef(null);
    useEffect(() => {
        if (props?.text) JsBarcode(barcodeRef.current, props?.text, {
            format: "CODE128",
            displayValue: true,
            fontSize: 16,
            lineColor: "#000000",
            width: 1.3,
            height: 40,
            margin: 2
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.text])

    return (
        <div>
            <svg ref={barcodeRef}></svg>
        </div>
    );
}

export default BarcodeGenerator;
