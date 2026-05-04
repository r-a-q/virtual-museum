import {createRoot} from 'react-dom/client'
import './index.css'
import Museum from './Museum.jsx'

//place our museum in the root
createRoot(document.getElementById('root')).render(
    <Museum/>
)
