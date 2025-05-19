import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "../utils/axiosInstance";

import "./NewService.css";
import SingleDropdown from "./singleDropdown";
import photoIcon from "../assets/photo.png";

export default function NewService({ onClose }) {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([null, null, null]);
  const fileInputRef = useRef(null);
  const thumbnailInputRefs = useRef([null, null, null]);

  const [categories, setCategories] = useState([]);

  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [availability, setAvailability] = useState("");

  const [errors, setErrors] = useState({
    serviceName: false,
    category: false,
    description: false,
    price: false,
    duration: false,
    availability: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/category/view_all", { withCredentials: true });
        const formatted = data.success.map((cat) => ({ id: cat.category_id, name: cat.category_name }));
        setCategories(formatted);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setCategories([]); // fallback
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const newErrors = {
      serviceName: !serviceName.trim(),
      category: !category,
      description: !description.trim(),
      price: !price.trim(),
      duration: !duration.trim(),
      availability: !availability.trim(),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((val) => val === true);

    if (!hasError) {
      try {
        await axios.post(
          "/api/cleaner/create",
          {
            name: serviceName,
            category_name: category.name,
            description,
            price,
            duration,
            availability,
          },
          { withCredentials: true }
        );

        alert("Service created successfully!");
        navigate("/cleaning-services");
      } catch (error) {
        console.error("Error creating service:", error);
        alert("Failed to create service.");
      }
    }
  };

  return (
    <div className="newServiceWrapper">
      <div className="newServiceContainer">
        <h1 className="newServiceTitle">Create New Services</h1>
        <div className="formGrid">
          <div className="inputGroup">
            <Input label="Service Name" value={serviceName} setter={setServiceName} error={errors.serviceName} />
            <div className="inputRow">
              <label className="formLabel">Category:</label>
              <SingleDropdown
                selected={category?.name}  // ✅ display the name in the button
                onChange={setCategory}     // ✅ directly set the category object
                options={categories}
              />
            </div>
            {errors.category && <span className="errorText">*Please select a category</span>}
            <Input label="Description" value={description} setter={setDescription} error={errors.description} multiline />
            <Input label="Price" value={price} setter={setPrice} error={errors.price} />
            <Input label="Duration" value={duration} setter={setDuration} error={errors.duration} />
            <Input label="Availability" value={availability} setter={setAvailability} error={errors.availability} />
          </div>
        </div>

        <div className="buttonGroup">
          <button className="primaryButton" onClick={handleSubmit}>Create New Services</button>
          <button className="secondaryButton" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, setter, error, multiline = false }) {
  return (
    <div className="inputRow">
      <label className="formLabel">{label}:</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => setter(e.target.value)}
          className={`formInput ${error ? "error" : ""}`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setter(e.target.value)}
          className={`formInput ${error ? "error" : ""}`}
        />
      )}
      {error && <span className="errorText">*Please fill in this field</span>}
    </div>
  );
}
