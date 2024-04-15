"use client";

import axiosInstance from "@/lib/Axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z as zod } from "zod";

const schema = zod.object({
  code: zod.string().min(1, { message: "Code is required" }),
  discountPercentage: zod
    .string()
    .min(1, { message: "Discount Percentage is required" }),
  limit: zod.string().min(1, { message: "Limit is required" }),
  products: zod
    .array(zod.string())
    .min(1, { message: "At least one product is required" }),
  expiryDate: zod.string().min(1, { message: "Expiry date is required" }),
  description: zod.string().min(1, { message: "Description is required" }),
});

const defaultValues = {
  code: "Kodekloud",
  discountPercentage: "20",
  limit: "1",
  products: ["productId"], // Ensure it's an array of strings
  expiryDate: new Date().toISOString().split("T")[0],
  description: "This coupon will be used by Kodekloud users",
};

const CouponForm = ({ getResData }) => {
  const [isPending, setIsPending] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      console.log("form values", values);
      setIsPending(true);

      const productIds = ["6605a614c41b05b4739a4184"];

      const submitData = {
        code: values.code,
        discountPercentage: Number(values.discountPercentage),
        limit: Number(values.limit),
        products: productIds,
        expiryDate: values.expiryDate,
        description: values.description,
      };

      const formData = new FormData();

      // Append other form fields to FormData
      Object.entries(submitData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log("form data", formData);

      await axiosInstance
        .post("/coupons", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("res", res);
          getResData(res.data.data);
          toast.success("Coupon created successfully");
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(`There is an error: ${err.response.data.error}`);

          // toast.error("Something went wrong please try again");
        })
        .finally(() => {
          setIsPending(false);
          reset();
        });
    } catch {
      () => {
        alert("Something went wrong please try again..");
      };
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <FormControl error={Boolean(errors.code)}>
                <InputLabel size="small">Code</InputLabel>
                <OutlinedInput size="small" {...field} label="Code" />
                {errors.code && (
                  <FormHelperText>{errors.code.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="discountPercentage"
            render={({ field }) => (
              <FormControl error={Boolean(errors.discountPercentage)}>
                <InputLabel size="small">Discount</InputLabel>
                <OutlinedInput
                  size="small"
                  {...field}
                  label="Discount"
                  type="number"
                />
                {errors.discountPercentage ? (
                  <FormHelperText>
                    {errors.discountPercentage.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="limit"
            render={({ field }) => (
              <FormControl error={Boolean(errors.limit)}>
                <InputLabel size="small">Limit</InputLabel>
                <OutlinedInput
                  size="small"
                  {...field}
                  label="Limit"
                  type="number"
                />
                {errors.limit ? (
                  <FormHelperText>{errors.limit.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="products"
            render={({ field }) => (
              <FormControl error={Boolean(errors.products)}>
                <InputLabel size="small">Products</InputLabel>
                <OutlinedInput
                  size="small"
                  {...field}
                  label="Products"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((product) => product.trim())
                    )
                  }
                />
                {errors.products ? (
                  <FormHelperText>{errors.products.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="expiryDate"
            render={({ field }) => (
              <FormControl error={Boolean(errors.expiryDate)}>
                <InputLabel size="small">Expiry Date</InputLabel>
                <OutlinedInput
                  size="small"
                  {...field}
                  label="Expiry Date"
                  type="date"
                />
                {errors.expiryDate ? (
                  <FormHelperText>{errors.expiryDate.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <FormControl error={Boolean(errors.description)}>
                <InputLabel size="small">Description</InputLabel>
                <OutlinedInput size="small" {...field} label="Description" />
                {errors.description && (
                  <FormHelperText>{errors.description.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button
            // disabled={isPending}
            type="submit"
            variant="contained"
            className="bg-primary/80"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Add Coupon"}
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default CouponForm;
