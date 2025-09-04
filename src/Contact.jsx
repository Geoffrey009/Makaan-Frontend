import qrCode from "./assets/qr.svg"

export const Contact = () => {
    return (
        <>
            <img src={qrCode} alt="" className="qr-code" style={{marginTop: "10%", marginLeft: "40%" }} />
        </>
    )
}