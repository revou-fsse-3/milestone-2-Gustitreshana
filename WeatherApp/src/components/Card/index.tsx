

const Card: React.FC = () => {

    // const apiKey = "c1bbe714ac530d052910f744c4c3da7b"
    
    return (
        <div className="bg-red-200">
            <div className="flex flex-col justify-center items-center bg-blue-300">
            <div>3 hour forecast data</div>
            <div className="flex justify-center items-center space-x-10">
            <div>waktu</div>
                <div className="flex flex-col justify-center items-center">
                    <div><img src="" alt="" />icon awan</div>
                    <div>suhu</div>
                </div>
            <div>deskripsi</div>
            </div>
            </div>

            <div className="flex justify-center items-center space-x-10">
            <div>waktu</div>
                <div className="flex flex-col justify-center items-center">
                    <div><img src="" alt="" />icon awan</div>
                    <div>suhu</div>
                </div>
            <div>deskripsi</div>
            </div>

            <div className="flex justify-center items-center space-x-10">
            <div>waktu</div>
                <div className="flex flex-col justify-center items-center">
                    <div><img src="" alt="" />icon awan</div>
                    <div>suhu</div>
                </div>
            <div>deskripsi</div>
            </div>
        </div>
    )
}

export default Card