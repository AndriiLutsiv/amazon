import React from "react";
import { Button } from "../button";
import { Carousel } from "../carousel";
import { Review } from "../review";
import { StarRating } from "../star-rating";
import styles from './section-one.module.css';
import { Root } from "../../pages/main/types";

interface Props {
    data: Root | null
}

const SectionOne: React.FC<Props> = ({ data }) => {
    const handleScroll = () => {
        const scatterBlock = document.getElementById('myDiv') as HTMLDivElement;
        const header = document.getElementById('header') as HTMLHeadElement;
        const headerHeight = +window.getComputedStyle(header).height.split('px')[0] + 15;

        const y = scatterBlock.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    return (
        <section className={styles.sectionOne}>
            <div className={styles.desktopContainer}>
                <div className={styles.productDisplay}>
                    <div className={styles.productRank}>
                        #{data?.product_rank}
                    </div>
                    <div className={styles.imgContainer}>
                        <img src={data?.product_image_url} alt="product" />
                    </div>
                </div>
                <div className={styles.textDisplay}>
                    <div className={styles.textContent}>
                        <div className={styles.descriptionTop}>
                            <h1 className={styles.productTitle}>
                                {data?.product_title}
                            </h1>
                            <div className={styles.productSpecifications}>
                                <div className={styles.ratingContainer}>
                                    <div className={styles.starCount}>
                                        <StarRating rating={data?.product_star_count} />
                                    </div>
                                    <div className={styles.reviewContainer} onClick={handleScroll}>
                                        <div className={styles.arrow}>&#8735;</div>
                                        <div className={styles.reviewCount}>{data?.product_review_count}</div>
                                    </div>
                                </div>
                                <div className={styles.priceContainer}>
                                    <div className={styles.productPrice}>
                                        {data?.product_price.slice(1, 3)}
                                        <span className={styles.currency}>{data?.product_price.slice(0, 1)}</span>
                                        <span className={styles.priceDecimal}>{data?.product_price.slice(4, 6)}</span>
                                    </div>
                                    <div className={styles.productExclusionPrice}>{data?.product_exlusion_price}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.keywordsContainer}>
                            {data?.product_top_keywords.map((keyword, i) => <div key={i} className={styles.keyword}>{keyword}</div>)}
                        </div>
                    </div>
                    <Review
                        text={data?.product_top_review.text}
                        bold_index={data?.product_top_review.bold_index || []}
                    />
                    <div className={styles.buttonWrapper}>
                        <a href={data?.product_purchase_link} target="_blank">
                            <Button />
                        </a>
                    </div>
                </div>
            </div>
            { /* @ts-ignore */}
            <Carousel list={data?.related_product_list} />

            <ul id='elementInView' className={styles.productDescription}>
                {data?.product_description}
            </ul>
        </section>
    );
};

export default SectionOne;
