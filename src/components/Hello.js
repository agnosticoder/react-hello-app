import React from 'react';

const Hello = () => {
    const [geoInfo, setGeoInfo] = React.useState(null);
    const [hello, setHello] = React.useState(null);
    const [error, setError] = React.useState('');

    const fetchData = React.useCallback(async (url) => {
        try {
            const data = await fetch(url);
            const json = data.json();
            return json;
        } catch (error) {
            setError(error.toString())
        }
    },[]);

    const getIPAddress = async () => {
        const {ip} = await fetchData('https://api.ipify.org?format=json') || {};

        if(!ip){
            setError("Couldn't fetch ip");
            return;
        }

        const geo = await fetchData(`http://ip-api.com/json/${ip}`);
        if(!geo){
            setError("Couldn't fetch geo");
            return;
        }
        setGeoInfo(geo);

        const {hello} = await fetchData(`https://fourtonfish.com/hellosalut/?ip=${ip}`) || {};
        if(!hello){
            setError("Couldn't fetch hello");
            return;
        }
        setHello(hello);
    }



    const {city, regionName, timezone, country, countryCode, isp} = geoInfo || {};
    return (
        <div>
            <h2>This app say hello in users's native language</h2>
            {error && <h3 style={{color: 'red'}}>{error}</h3>}
            <button onClick={getIPAddress}>Get your IP Address</button>
            {geoInfo && (
                <div>
                    <li>{city}</li>
                    <li>{regionName}</li>
                    <li>{timezone}</li>
                    <li>{country}</li>
                    <li>{countryCode}</li>
                    <li>{isp}</li>
                </div>
            )}
            <h1 dangerouslySetInnerHTML={{__html: hello}}></h1>
        </div>
    )
}

export default Hello;
