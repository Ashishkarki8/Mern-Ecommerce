/* import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const   CommonForm = ({ formControls, onSubmit, buttonText }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const [passwordStates, setPasswordStates] = useState(
    formControls.reduce((acc, control) => {
      if (control.componentType === "input" && control.type === "password") {
        acc[control.name] = { show: false, hasValue: false };
      }
      return acc;
    }, {})
  );

  const handlePasswordToggle = (fieldName) => {
    setPasswordStates((prev) => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], show: !prev[fieldName].show },
    }));
  };

  const handlePasswordInputChange = (fieldName, value) => {
    setPasswordStates((prev) => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], hasValue: value.length > 0 },
    }));
  };

  const renderInputsByComponentType = (controlItem) => {
    switch (controlItem.componentType) {
      case "input":
        return (
          <div className="relative">
            <Input
              id={controlItem.name}
              type={
                controlItem.type === "password" && !passwordStates[controlItem.name]?.show
                  ? "password"
                  : "text"
              }
              placeholder={controlItem.placeholder}
              {...register(controlItem.name, {
                ...controlItem.validation,
                onChange: (e) => handlePasswordInputChange(controlItem.name, e.target.value),
              })}
              className={`border ${
                errors[controlItem.name] ? "border-red-600" : "border-gray-300"
              }`}
            />
            {controlItem.type === "password" && passwordStates[controlItem.name]?.hasValue && (
              <button
                type="button"
                onClick={() => handlePasswordToggle(controlItem.name)}
                className="absolute p-1 -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-gray-100"
              >
                {passwordStates[controlItem.name]?.show ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        );
      case "select":
        return (
          <Controller
            name={controlItem.name}
            control={control}
            rules={controlItem.validation}
            render={({ field }) => (
              <Select {...field}>
                <SelectTrigger>
                  <SelectValue placeholder={controlItem.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {controlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.value} value={optionItem.value}>
                      {optionItem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );
      case "textarea":
        return (
          <Input
            id={controlItem.name}
            type="textarea"
            placeholder={controlItem.placeholder}
            {...register(controlItem.name, controlItem.validation)}
            className={`border ${
              errors[controlItem.name] ? "border-red-500" : "border-gray-300"
            }`}
          />
        );
      default:
        return (
          <Input
            id={controlItem.name}
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            {...register(controlItem.name, controlItem.validation)}
            className={`border ${
              errors[controlItem.name] ? "border-red-500" : "border-gray-300"
            }`}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {formControls.map((controlItem) => (
        <div key={controlItem.name} className="flex flex-col gap-2">
          <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
          {renderInputsByComponentType(controlItem)}
          {errors[controlItem.name] && (
            <span className="text-sm text-red-700">
              {errors[controlItem.name].message}
            </span>
          )}
        </div>
      ))}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`mt-4 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm; */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {  MailOpen } from "lucide-react";


const CommonForm = ({ formControls, formData, setFormData,onSubmit,buttonText}) => {
  
  

  const renderInputsByComponentType = (getControlItem) => {
    if (!getControlItem) return null;   // Avoid errors if control is undefined
    let element = null;
    const value= formData[getControlItem.name] || ''; //way to print obj
     console.log("value",value);
     console.log("formdata",formData);
    switch (getControlItem.componentType) {
      case "input":
        element = (
          /* console.log("heelo"), */
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event)=> {
               setFormData({...formData,[getControlItem.name]: event.target.value})
            }}
          />
        );
        break;

      case "select":
        element = (
          <Select onValueChange={(value)=>{
            setFormData({...formData,[getControlItem.name]: value})
          }} value={value}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={getControlItem.placeholder}
              ></SelectValue>
            </SelectTrigger>
            <SelectContent>
               {
                getControlItem.options && getControlItem.options.length>0?
                getControlItem.options.map((optionItem)=>{
                  return <SelectItem key={optionItem.value} value={optionItem.value}>{optionItem.label}</SelectItem>
                }):null
               }
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea 
          name={getControlItem.name}
          plasholder={getControlItem.placeholder}
          id={getControlItem.name}
          value={value}
          onChange={(event)=> {
               setFormData({...formData,[getControlItem.name]: event.target.value})
            }}
          />
        );
        break;

      /* default:
        element = (
          <Input
            name={getControlItem.name}
            plasholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
          />
        );
        break; */
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 bg-blue-500 border-2 border-black">
        {formControls.map((controlItem, i) => {
          return (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
             {console.log("starting again")}
              <label htmlFor={controlItem.name} className="mb-1">
                {controlItem.label}
              </label>
              {renderInputsByComponentType(controlItem)}
            </div>
          );
        })}
        <Button type="submit" className='w-full mt-2'>{buttonText || 'Submit'}</Button>
       {/*  <Button onClick={handleGoogleLogin} className='w-full mt-1' variant="destructive"> <MailOpen /> Login with Email</Button> */}
      </div>
    </form>
  );
};

export default CommonForm;
