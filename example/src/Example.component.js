import React, {useEffect, useState} from 'react';

const ExampleComponent = (props) => {

        // Ici props contient donc :
        // props.resultKey => key du tableau "results" nécessaire pour setter la bonne valeur
        // props.functionSetResults => pour lancer la fonction du main depuis le component

        // ----

        // States avec les différentes valeurs à stocker
        const [value1, setValue1] = useState("")
        const [value2, setValue2] = useState(0)
        // Possibilité également de mettre tous les states (value1, value2....) dans un seul state sous format:
        //
        // state: {
        //      value1: {},
        //      value2: {},
        //      ...
        // }
        //
        // Dans ce cas penser à changer le callback du useEffect qui prend plus bas [value1, value2]
        // ---


        // Function pour setter des states (permet de les retrouver au même endroit).
        const handleChange = async (setter, value) => {
            setter(value)
        };


        // Hook appelé à la génération de la page car aucune restriction n'est imposé aux fields value1 et value2.
        // Ce hook captera chaque modification de field et appelera la fonction du App.js "FunctionSetResults"
        // pour set la key correspondante à l'appel de component dans le state "results".
        useEffect(() => {
            let formatedData = {
                nomDeLaValeur1: value1,
                nomDeLaValeur2: value2
            }

            // Call de FunctionSetResults pour setter le props "results" de la page App.js (main)
            props.functionSetResults(props.resultKey, formatedData)

            // Liste des callbacks --v
        }, [value1, value2]);


        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "lightgray",
                width: "25vw",
                margin: 30,
                padding: 10
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <p>valeur 1 du composant :</p>
                    <input
                        type={"text"}
                        onChange={((e) => {
                            handleChange(setValue1, e.target.value)
                        })}
                    />
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <p>valeur 2 du composant :</p>
                    <input
                        type={"number"}
                        onChange={((e) => {
                            handleChange(setValue2, e.target.value)
                        })}
                    />
                </div>
            </div>
        );
    }
;

export default ExampleComponent;
