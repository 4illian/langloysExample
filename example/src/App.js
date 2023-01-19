import './App.css';
import {useEffect, useState} from "react";
import ExampleComponent from "./Example.component";

function App() {

    // Un state du nombre de fois que le component enfant est demandé.
    const [numberOfComponentRequired, setNumberOfComponentRequired] = useState(0)

    // State contenant les résultats des différents components enfants
    const [results, setResults] = useState([])

    // Hook prenant pour callback le state "numberOfComponentRequired". A chacune des modifications apportées à "numberOfComponentRequired",
    // ce hook sera activé et génèrera le state "results" adapté pour stocker toute la data des components enfants.
    useEffect(() => {
        let handle = []

        for (let i = 0; i < numberOfComponentRequired; i++)
            handle[i] = {}

        setResults(handle)
    }, [numberOfComponentRequired]);


    // Function permettant d'avoir la main sur la modification du nombre de components demandé et d'y ajouter une limite
    // pour éviter la génération abusive.
    const handleChangeWithRestriction = async (setter, value) => {
        // Limite à adapter --v
        if (value < 11)
            setter(value)
        else setter(10)
    };


    // Fonction call depuis le component enfant qui set la key du state "results" modifiée.
    function FunctionSetResults(key, value) {
        results[key] = value
        console.log("Tableau results -v-")
        console.log(results)
    }

    return (
        <div className="App">
            Nombre de fois demandé :
            <input
                type={"number"}
                onChange={((e) => {
                    handleChangeWithRestriction(setNumberOfComponentRequired, e.target.value)
                })}
            />

            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
            }}>
                {
                    // Mapping pour afficher le nombre de components demandé avec en passage de props les éléments nécessaires
                    // à faire parvenir à l'enfant pour setter le state "results"
                    Object.keys(results).map(function (item, i) {
                        return (
                            <ExampleComponent
                                resultKey={i}
                                functionSetResults={FunctionSetResults}
                            />
                        )
                    })
                }

            </div>

            <h2>La console contient un log de l'objet généré qui réapparait à chacune des modifications des components
                enfants.</h2>
        </div>
    );
}

export default App;
