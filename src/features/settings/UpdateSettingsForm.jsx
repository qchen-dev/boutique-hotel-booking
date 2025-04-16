import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    // defaultValues: settings,
  });

  const { errors } = formState;

  if (isLoading) return <Spinner />;

  // const {
  //   minBookingLength,
  //   maxBookingLength,
  //   maxGuestsPerBooking,
  //   breakfastPrice,
  // } = settings;

  function onSubmit(data) {
    // console.log("on submit", data);
    updateSetting(
      { newSetting: data },
      {
        onSuccess: (response) => {
          reset();
        },
      }
    );
  }

  function onError(errors) {
    // console.error("Form on submit error:", errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label='Minimum nights/booking'
        error={error?.minBookingLength?.message}
      >
        <Input
          type='number'
          id='minBookingLength'
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(evt) => {
            console.log(evt.target.value);
          }}
          {...register("minBookingLength", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum nights/booking'
        error={error?.maxBookingLength?.message}
      >
        <Input
          type='number'
          id='maxBookingLength'
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          {...register("maxBookingLength", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum guests/booking'
        error={error?.maxGuestsPerBooking?.message}
      >
        <Input
          type='number'
          id='maxGuestsPerBooking'
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          {...register("maxGuestsPerBooking", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label='Breakfast price' error={error?.breakfastPrice?.message}>
        <Input
          type='number'
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          id='breakfastPrice'
          {...register("breakfastPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
