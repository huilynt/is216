 <template>
    <div><p>If you like my page, click 
        <button @click="count++">Like</button></p>
        <p>People liked me {{ count }} times.</p>
    </div>    
 </template>

 <script>
    export default {
        name: 'button-counter',
        data() {
            return {
                count: 0
            }
        } 
    }
 </script>