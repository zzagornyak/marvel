import "./char-search.scss"
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"
import useMarvelService from "../../services/marvel-services";
import { useState } from 'react';

const CharSearch = () => {
    const {getCharacterByName} = useMarvelService()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [foundChar, setFoundChar] = useState(null)
    return (
        <div className="search">
            <Formik
                onSubmit={(values) => {
                    setError(false)
                    setFoundChar(false)
                    getCharacterByName(values.name)
                        .then((res) => {
                            setFoundChar(res.name)
                        })
                        .catch(() => {
                            setError(true)
                        })
                    
                        
                }}
                initialValues={{
                    name : "" 
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, "* Minimum 2 letters")
                        .required("* Required input"),
                })}>
                <Form className="search__form">
                    <span className="search__title">
                        Or find a character by name:
                    </span>
                    <div className="search__wrapper">
                        <div>
                            <label  htmlFor="name" className="search__label" />
                            <Field
                                className="search__input"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter name"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="button button__main"
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <ErrorMessage 
                        className="search__error" 
                        name="name"
                        component="div"
                    />
                    {error && <span className="search__error">The character was not found. Check the name and try again</span> }
                    {
                        foundChar &&
                        (
                            <div className="search__wrapper">
                                <span className="search__done">There is! Visit {foundChar} page?</span>
                                <button 
                                    onClick={() => {
                                        navigate(`/${foundChar}`)
                                    }}
                                    className="button button__secondary">
                                        <div className="inner">
                                            Page
                                        </div>
                                </button>
                            </div>
                        )
                    }
                </Form>
            </Formik>

        </div>
    )
}

export default CharSearch