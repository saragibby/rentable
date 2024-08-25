"use client";

import { InputWithLabel } from "./ui/inputWithLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchFor } from "../pages/index";

export default function WhereSelector({
  searchFor,
  setSearchFor,
}: {
  searchFor: SearchFor;
  setSearchFor: any;
}) {
  return (
    <div className="flex gap-5">
      <div className="w-72">
        <InputWithLabel
          label="Location"
          value={searchFor.location}
          onChange={({ target }) => {
            setSearchFor({ ...searchFor, location: target.value });
          }}
        />
      </div>
      <div className="w-56">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-56">
      <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="house">house</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
