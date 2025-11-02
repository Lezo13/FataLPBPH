enum FormState {
    pristine = 0,
    submitted = 1,
    successful = 2,
    error = 3
}

const FORM_STATES: typeof FormState = FormState;

export { FormState, FORM_STATES };
