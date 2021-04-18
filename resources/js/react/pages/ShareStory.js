import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";
import { fetchOptions } from "../store/rootSlice";
import forEach from "lodash/forEach";
import API from "../utils/API";
import Select from "react-select";
import { Formik, Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const colors = require("tailwindcss/colors");
import { enUS } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import lightFormat from "date-fns/lightFormat";
import { Reoverlay } from "reoverlay";
import Confirmation from "../components/modals/Confirmation";
import Error from "../components/modals/Error";
import { useHistory } from "react-router-dom";
import Recaptcha from "react-recaptcha";
//...

const ShareStory = props => {
    const dispatch = useDispatch();
    let history = useHistory();
    const { initialized, data } = useSelector(state => state.root.options);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const colorStyles = {
        input: styles => ({
            ...styles,
            outline: "none",
            "--tw-ring-color": "transparent",
            border: "none"
        }),
        control: (base, state) => ({
            ...base,
            "&:hover": { borderColor: colors.indigo["500"] }, // border style on hover
            border: `2px solid ${colors.gray["300"]}`, // default border color
            boxShadow: "none" // no box-shadow
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                    ? data.color
                    : isFocused
                    ? colors.indigo["50"]
                    : null,
                ":active": {
                    ...styles[":active"],
                    backgroundColor: colors.indigo["50"]
                }
            };
        },
        multiValue: (styles, { data }) => {
            return {
                ...styles,
                backgroundColor: colors.indigo["100"]
            };
        }
    };

    const mapSelectOptions = (obj, param) => {
        return (Object.keys(obj).map(
            key => (
                <option
                    value={key}
                    key={key}
                >
                    {data.[param][key]}
                </option>
            )
        ))
    }

    // useEffect(() => {
    //     if(initialized){
    //         const script = document.createElement("script");
    //         script.src = "https://www.google.com/recaptcha/api.js";
    //         script.async = true;
    //         script.defer = true;
    //         script.addEventListener('load', ()=>{
    //             console.log('Loaded')
    //             setTimeout(function(){
    //                 setRecaptchaLoaded(true);
    //             }, 200);
    //
    //         });
    //         document.body.appendChild(script);
    //     }
    // }, [initialized]);

    useEffect(() => {
        const promise = dispatch(fetchOptions());
        promise.then(() => {
            //is initialized
        });
        return () => {};
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            gender: "",
            race: "",
            country: "",
            fully_recovered: "",
            weight: "",
            date_infected: "",
            recovery_percentage: "",
            story: "",
            symptoms: "",
            recaptcha: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            age: Yup.string().required("Age is required"),
            gender: Yup.string().required("Gender is required"),
            race: Yup.string().required("Race is required"),
            weight: Yup.string().required("Weight is required"),
            date_infected: Yup.string().required("Date infected is required"),
            country: Yup.string().required("Country is required"),
            fully_recovered: Yup.string().required(
                "Fully recovered is required"
            ),
            recovery_percentage: "",
            story: "",
            symptoms: "",
            recaptcha: Yup.string().required(
                "Please validate that you are human"
            )
            // lastname: Yup.string(),
            // emailaddress: Yup.string().email('Please enter a vaild email'),
            // contactnumber: Yup.number().typeError('Phone number must not include parenthesis or dashes'),
        }),
        onSubmit: values => {
            handleFormSubmission(values);
        }
    });

    const handleCancel = () => {
        history.push("/");
    };

    const handleFormSubmission = async values => {
        try {
            const postsSubmit = await API.post(`/posts`, values);
            Reoverlay.showModal(Confirmation);
            history.push("/");
        } catch (e) {
            Reoverlay.showModal(Error, {
                errorText: "There's been an error with your request"
            });
        } finally {
        }
    };

    return (
        <Container>
            {!initialized ? (
                <Loading></Loading>
            ) : (
                <form
                    className="space-y-8 divide-y divide-gray-200"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Your Story
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Your information is safe. We do not ask any
                                    identifying questions besides name, which
                                    can be annoymous.
                                </p>
                            </div>
                            <div className="space-y-6 sm:space-y-5">
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Name*
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        />
                                        {formik.errors.name &&
                                        formik.touched.name ? (
                                            <div className="mt-2 text-sm text-red-500">
                                                {formik.errors.name}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="age"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Age*
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select
                                            id="age"
                                            name="age"
                                            autoComplete="age"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.age}
                                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="">Select Age</option>
                                            {mapSelectOptions(data.age, "age")}
                                        </select>
                                        {formik.errors.age &&
                                        formik.touched.age ? (
                                            <div className="mt-2 text-sm text-red-500">
                                                {formik.errors.age}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="gender"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Gender*
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select
                                            id="gender"
                                            name="gender"
                                            autoComplete="gender"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.gender}
                                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="">
                                                Select Gender
                                            </option>
                                            {mapSelectOptions(
                                                data.gender,
                                                "gender"
                                            )}
                                        </select>
                                        {formik.errors.gender &&
                                        formik.touched.gender ? (
                                            <div className="mt-2 text-sm text-red-500">
                                                {formik.errors.gender}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="race"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Race*
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select
                                            id="race"
                                            name="race"
                                            autoComplete="race"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.race}
                                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="">
                                                Select Race
                                            </option>
                                            {mapSelectOptions(
                                                data.race,
                                                "race"
                                            )}
                                        </select>
                                        {formik.errors.race &&
                                        formik.touched.race ? (
                                            <div className="mt-2 text-sm text-red-500">
                                                {formik.errors.race}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="weight"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Weight*
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select
                                            id="weight"
                                            name="weight"
                                            autoComplete="weight"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.weight}
                                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="">
                                                Select Weight
                                            </option>
                                            {mapSelectOptions(
                                                data.weight,
                                                "weight"
                                            )}
                                        </select>
                                        {formik.errors.weight &&
                                        formik.touched.weight ? (
                                            <div className="mt-2 text-sm text-red-500">
                                                {formik.errors.weight}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Country*
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.country}
                                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="">
                                                Select Country
                                            </option>
                                            {mapSelectOptions(
                                                data.countries,
                                                "countries"
                                            )}
                                        </select>
                                        {formik.errors.country &&
                                        formik.touched.country ? (
                                            <div className="mt-2 text-sm text-red-500">
                                                {formik.errors.country}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="date_infected"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Date Infected*
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <DatePicker
                                            locale={enUS}
                                            onDateChange={val => {
                                                formik.setFieldValue(
                                                    "date_infected",
                                                    val
                                                );
                                            }}
                                        >
                                            {({ inputProps, focused }) => {
                                                const adjustedInputProps = {
                                                    ...inputProps,
                                                    value: formik.values
                                                        .date_infected
                                                        ? lightFormat(
                                                              formik.values
                                                                  .date_infected,
                                                              "MM/dd/yyyy"
                                                          )
                                                        : ""
                                                };
                                                return (
                                                    <input
                                                        type="text"
                                                        name="date_infected"
                                                        id="date_infected"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        {...adjustedInputProps}
                                                        className={
                                                            "max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" +
                                                            (focused
                                                                ? " -focused"
                                                                : "")
                                                        }
                                                    />
                                                );
                                            }}
                                        </DatePicker>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Can be an approximation
                                        </p>
                                        {formik.errors.date_infected &&
                                        formik.touched.date_infected ? (
                                            <div className="mt-2 text-sm text-red-500">
                                                {formik.errors.date_infected}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="fully_recovered"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Fully Recovered?*
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <select
                                            id="fully_recovered"
                                            name="fully_recovered"
                                            autoComplete="fully_recovered"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                                formik.values.fully_recovered
                                            }
                                            className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option value="">
                                                Select Recovery Status
                                            </option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                        {formik.errors.fully_recovered &&
                                        formik.touched.fully_recovered ? (
                                            <div className="mt-2 text-sm text-red-500">
                                                {formik.errors.fully_recovered}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                {formik.values.fully_recovered === "no" && (
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label
                                            htmlFor="recovery_percentage"
                                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                        >
                                            Recovery Percentage
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <select
                                                id="recovery_percentage"
                                                name="recovery_percentage"
                                                autoComplete="recovery_percentage"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values
                                                        .recovery_percentage
                                                }
                                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                            >
                                                <option value="">
                                                    Select Recovery Percentage
                                                </option>
                                                {mapSelectOptions(
                                                    data.recoveryPercentage,
                                                    "recoveryPercentage"
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                )}
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="story"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Your Story*
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        {/*  */}
                                        <ReactQuill
                                            theme="snow"
                                            value={formik.values.story}
                                            onChange={event =>
                                                formik.setFieldValue(
                                                    "story",
                                                    event
                                                )
                                            }
                                        />

                                        <p className="mt-2 text-sm text-gray-500">
                                            Write a detailed account of your
                                            story.
                                        </p>
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="story"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Symptoms
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            options={data.symptoms}
                                            styles={colorStyles}
                                            isMulti
                                            name="symptoms"
                                            onChange={value =>
                                                formik.setFieldValue(
                                                    "symptoms",
                                                    value.map(
                                                        item => item.value
                                                    )
                                                )
                                            }
                                        />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Please select all of your symptoms
                                        </p>
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="story"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >
                                        Treatment
                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                        <Select
                                            className="react-select"
                                            classNamePrefix="react-select"
                                            options={data.treatment}
                                            styles={colorStyles}
                                            isMulti
                                            name="treatment"
                                            onChange={value =>
                                                formik.setFieldValue(
                                                    "treatment",
                                                    value.map(
                                                        item => item.value
                                                    )
                                                )
                                            }
                                        />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Please select all treatments you've
                                            tried
                                        </p>
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label
                                        htmlFor="story"
                                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                    >

                                    </label>
                                    <div className="mt-1 sm:mt-0 sm:col-span-2 text-right flex justify-end">
                                        <div>
                                            {/* {recaptchaLoaded && */}
                                                <Recaptcha
                                                    sitekey="6Lf3ja4aAAAAAJkMiSE-uANTSqyrzBUWvCWaMpWF"
                                                    render="explicit"
                                                    verifyCallback={(response) => { formik.setFieldValue("recaptcha", response); }}
                                                    onloadCallback={() => { console.log("done loading!"); }}
                                                />
                                            {/* } */}

                                            {formik.errors.recaptcha &&
                                            formik.touched.recaptcha ? (
                                                <div className="mt-2 text-sm text-red-500">
                                                    {formik.errors.recaptcha}
                                                </div>
                                            ) : null}</div>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Container>
    );
};

export default ShareStory;
