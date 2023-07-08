export default {
    template: `
    <div class="form-container">
        <h2>Add a Review</h2>
        <form @submit.prevent="onSubmitReview" class="review-form">

            <div class="form-row">
                <label for="fullname">Full Name:</label>
                <input type="text" id="fullname" v-model="review.fullname" required class="form-input">
            </div>
            
            <div class="form-row">
                <label for="rating">Rating:</label>
                <div class="rating-stars">
                    <span class="star" v-for="i in 5" :key="i" @click="setRating(i)">
                        <span :class="['star-icon', { 'selected': review.rating >= i }]">&starf;</span>
                    </span>
                </div>
            </div>
            
            <div class="form-row">
                <label for="readAt">Read At:</label>
                <input type="date" id="readAt" v-model="review.readAt" required class="form-input">
            </div>
            
            <button class="form-btn">Submit</button>
        </form>
    </div>      `,
    data() {
        return {
            review: {
                fullname: '',
                rating: '',
                readAt: '',
            },
        }
    },
    methods: {
        setRating(rating) {
            this.review.rating = rating
        },

        onSubmitReview() {
            this.$emit('add-review', this.review)
            this.review = {
                fullname: '',
                rating: '',
                readAt: '',
            }
        },
    },
}
