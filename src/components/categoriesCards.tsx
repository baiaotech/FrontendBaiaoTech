import { useEffect, useState } from "react";
import { categorias } from "@/components/categorias";
import arrowLeftIcon from "@/assets/arrow-left.svg";
import arrowRightIcon from "@/assets/arrow-right.svg";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const updateItemsPerPage = () => {
    if (window.innerWidth <= 768) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(6);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const visibleCategories = categorias.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const handleNextCategories = () => {
    if (currentIndex + itemsPerPage < categorias.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrevCategories = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div className="categories">
      <div className="category-content">
        <div className="category-title-btn">
          <div className="category-title">
            <h2>Categorias</h2>
          </div>
          <div className="category-btn">
            <button
              id="prevBtn"
              onClick={handlePrevCategories}
              disabled={currentIndex === 0}
            >
              <Image src={arrowLeftIcon} alt="Anterior" />
            </button>
            <button
              id="nextBtn"
              onClick={handleNextCategories}
              disabled={currentIndex + itemsPerPage >= categorias.length}
            >
              <Image src={arrowRightIcon} alt="Próximo" />
            </button>
          </div>
        </div>
        <div className="card-categories">
          {visibleCategories.map((category) => (
            <Link
              href={`/categoria/${category.nome}`}
              key={category.id}
              className="card"
            >
              <div className="card-image"></div>
              <div className="card-title">
                <h3>{category.nome}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
